---
slug: videoprocess
title: 数字视频处理基本方法
authors: Chengzihan
tags: [java,opencv]
---

## 关键帧提取

实现视频`(.avi)`镜头突变检测并提取出关键帧，然后对其做帧内图像分割，显示分割结果（关键帧提取及图像分割方法自选，各完成一种即可，如完成多种方法，可加分）。

### 分水岭算法

```java
void watershed(Mat& _img)
{
    Mat image = _img;
    Mat huidu;
    // 转换成灰度图像
    cvtColor(image, huidu, CV_RGB2GRAY);
    // 高斯滤波和边缘检测
    GaussianBlur(huidu, huidu, Size(3, 3), 0, 0);
    Canny(huidu, huidu, 50, 150, 3);
    // 轮廓
    vector<vector<Point>> contours;
    vector<Vec4i> hierarchy;
    // 找到轮廓
    findContours(huidu, contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE, Point());
    // 生成分水岭图像
    Mat imageContours = Mat::zeros(image.size(), CV_8UC1);
    Mat biaoji(image.size(), CV_32S);
    biaoji = Scalar::all(0);
    int index = 0, n1 = 0;
    // 绘制轮廓
    for (; index >= 0; index = hierarchy[index][0], n1++)
    {
    drawContours(biaoji, contours, index, Scalar::all(n1 + 1), 1, 8, hierarchy); // 绘制轮廓
    drawContours(imageContours, contours, index, Scalar(255), 1, 8, hierarchy); // 绘制轮廓
    }

    Mat biaojiShows;
    convertScaleAbs(biaoji, biaojiShows);
    watershed(image, biaoji);

    Mat w1; // 分水岭后的图像
    convertScaleAbs(biaoji, w1); // 转换成8位图像
    imshow("分水岭算法", w1);
    waitKey(10);
}
```

### 最大熵算法

```java
/**
* @brief 最大熵法
* @param currentframe 输入图像
* @param threshImage 输出图像
*/

void threshEntroy(Mat currentframe)
{
 int hist_t[256] = { 0 }; //每个像素值个数
 int index = 0;//最大熵对应的灰度
 double Property = 0.0;// 像素占有比率
 double maxEntropy = -1.0;//最大熵
 double frontEntropy = 0.0;//前景熵
 double backEntropy = 0.0;//背景熵
 int sum_t = 0; //像素总数
 int nCol = currentframe.cols;//每行的像素数
 // 计算每个像素值的个数
 for (int i = 0; i < currentframe.rows; i++)
 {
  uchar* pData = currentframe.ptr<uchar>(i);
    for (int j = 0; j < nCol; ++j)
    {
        ++sum_t;
        hist_t[pData[j]] += 1;
    }
 }
 // 计算最大熵
 for (int i = 0; i < 256; i++)
 {
  // 背景像素数
  double sum_back = 0;
  for (int j = 0; j < i; j++)
  {
    sum_back += hist_t[j];
  }

  //背景熵
  for (int j = 0; j < i; j++)
  {
    if (hist_t[j] != 0)
    {
        Property = hist_t[j] / sum_back;
        backEntropy += -Property * logf((float)Property);
    }
  }
  //前景熵
  for (int k = i; k < 256; k++)
  {
    if (hist_t[k] != 0)
    {
        Property = hist_t[k] / (sum_t - sum_back);
        frontEntropy += -Property * logf((float)Property);
    }
  }

  if (frontEntropy + backEntropy > maxEntropy)// 求最大熵
  {
        maxEntropy = frontEntropy + backEntropy;
        index = i;
  }
  frontEntropy = 0.0; // 前景熵清零
  backEntropy = 0.0; // 背景熵清零
 }
 Mat threshImage;
 threshold(currentframe, threshImage, index, 255, 0); //进行阈值分割
 imshow("最大熵法", threshImage);
}
```

### 直方图双峰法

```java
/**
* @brief 计算直方图，两个峰值，然后波谷阈值法
* @param currentframe 输入图像
*/

void threshBasic(const Mat& currentframe)
{
    // 计算灰度直方图，zero函数用于创建一个大小为256的Mat对象，类型为CV_32F，全部初始化为0
    Mat histogram = Mat::zeros(Size(256, 1), CV_32SC1);
    // 获取行高
    int rows = currentframe.rows;
    int cols = currentframe.cols;
    // 遍历图像，计算灰度直方图
    for (int i = 0; i < rows; i++){
        for (int j = 0; j < cols; j++){
            int index = int(currentframe.at<uchar>(i, j));
            histogram.at<int>(0, index) += 1;
        }
    }
    // 找到灰度直方图最大峰值对应的灰度值
    Point peak1;
    // 在数组中找到全局最小和最大值
    minMaxLoc(histogram, NULL, NULL, NULL, &peak1);
    int p1 = peak1.x;
    Mat gray_2 = Mat::zeros(Size(256, 1), CV_32FC1);
    for (int k = 0; k < 256; k++)
    {
        int hist_k = histogram.at<int>(0, k);
        gray_2.at<float>(0, k) = pow(float(k - p1), 2) * hist_k;
    }
    Point peak2;
    minMaxLoc(gray_2, NULL, NULL, NULL, &peak2);
    int p2 = peak2.x;
    //找到两个峰值之间的最小值对应的灰度值，作为阈值
    Point threshLoc;
    int thresh = 0;
    if (p1 < p2) {
        minMaxLoc(histogram.colRange(p1, p2), NULL, NULL, &threshLoc);
        thresh = p1 + threshLoc.x + 1;
    }
    else {
        minMaxLoc(histogram.colRange(p2, p1), NULL, NULL, &threshLoc);
        thresh = p2 + threshLoc.x + 1;
    }
    /**
     * CV_EXPORTS_W double threshold( InputArray src, OutputArray dst,
             double thresh, double maxval, int type );
    * src:输入图像
    * dst:输出图像
    * thresh:阈值
    * maxval:输出图像中最大值
    * type:阈值类型，THRESH_BINARY 指二值化
    */
    Mat threshImage;
    threshold(currentframe, threshImage, thresh, 255, THRESH_BINARY);
    imshow("直方图阈值分割结果", threshImage);
}
```

## 视频增强和滤波

编程实现具有视频增强及滤波功能的视频播放器，包括以下功能：

1. 控制视频的播放与暂停。
2. 控制视频播放进度。
3. 可调节当前视频的对比度与亮度。
4. 可对视频进行增强（如直方图均衡化）。
5. 可对视频进行滤波（任意实现一种滤波器，多做加分）

### 改变视频亮度

```java
void changeLight(int x) {
 x = x - 255;
 for (int r = 0; r < nowRate.rows; r++) {
  for (int c = 0; c < nowRate.cols; java) {
   int B = nowRate.at<Vec3b>(r, c)[0];
   int G = nowRate.at<Vec3b>(r, c)[1];
   int R = nowRate.at<Vec3b>(r, c)[2];
   B += x;
   G += x;
   R += x;
   if (B > 255)B = 255;
   if (G > 255)G = 255;
   if (R > 255)R = 255;
   if (B < 0)B = 0;
   if (G < 0)G = 0;
   if (R < 0)R = 0;
   nowRate.at<Vec3b>(r, c)[0] = B;
   nowRate.at<Vec3b>(r, c)[1] = G;
   nowRate.at<Vec3b>(r, c)[2] = R;
  }
 }
}
```

### 改变视频对比度

```java
void Contrast(int x) {
 float k = 0;
 if (x - 50 == 0)
  return;
 else if (x - 50 > 0) {
     k = 1 + (x - 50) / 100.0;
 }
 else
     k = 1 - (50 - x) / 100.0;
    
 for (int r = 0; r < nowRate.rows; r++) {
  for (int c = 0; c < nowRate.cols; java) {
   int B = nowRate.at<Vec3b>(r, c)[0];
   int G = nowRate.at<Vec3b>(r, c)[1];
   int R = nowRate.at<Vec3b>(r, c)[2];
   B *= k;
   G *= k;
   R *= k;
   if (B > 255)B = 255;
   if (G > 255)G = 255;
   if (R > 255)R = 255;
   nowRate.at<Vec3b>(r, c)[0] = B;
   nowRate.at<Vec3b>(r, c)[1] = G;
   nowRate.at<Vec3b>(r, c)[2] = R;
  }
 }
}
```

### 直方图均衡化

```java
// 直方图均衡化
void histVideo() {
 // 三个通道分别进行均衡化处理
 float sum_p = nowRate.rows * nowRate.cols;
 int hist[3][256] = { 0 };//BGR
 // 构造 3 通道的直方图
 for (int r = 0; r < nowRate.rows; r++) {
  for (int c = 0; c < nowRate.cols; java) {
   hist[0][nowRate.at<Vec3b>(r, c)[0]]++;
   hist[1][nowRate.at<Vec3b>(r, c)[1]]++;
   hist[2][nowRate.at<Vec3b>(r, c)[2]]++;
  }
 }
 float CDF[3][256] = { 0 };//3 个通道的累计分布
 // 计算 3 通道的所有累计分布函数的值
 for (int i = 0; i < 256; i++) {
  float sum[3] = { 0 };
  for (int k = 0; k <= i; k++) {
   sum[0] += hist[0][k];
   sum[1] += hist[1][k];
   sum[2] += hist[2][k];
  }
  CDF[0][i] = sum[0] / sum_p;
  CDF[1][i] = sum[1] / sum_p;
  CDF[2][i] = sum[2] / sum_p;
 }
 for (int r = 0; r < nowRate.rows; r++) {
  for (int c = 0; c < nowRate.cols; java) {
   for (int i = 0; i < 3; i++)
    nowRate.at<Vec3b>(r, c)[i] = 255 * CDF[i][nowRate.at<Vec3b>(r, c)[i]];
  }
 }
}
```

### 均值滤波

```java
void Filter(int x)  
{
 Mat temp = nowRate.clone();
 int num = x * x; // 滤波器的大小
 // 遍历图像
 for (int r = x / 2; r < nowRate.rows - x / 2; r++) {
  for (int c = x / 2; c < nowRate.cols - x / 2; java) {
   // 遍历滤波器
   for (int i = 0; i < 3; i++) {
    // 3 个通道
    int sum = 0;
    // 遍历滤波器
    for (int dr = - x / 2; dr <= x / 2; dr++) {
     for (int dc = - x / 2; dc <= x / 2; djava) {
      sum += temp.at<Vec3b>(r + dr, c + dc)[i];
     }
    }
    // 滤波器的值
    nowRate.at<Vec3b>(r, c)[i] = (float)sum / num;
   }
  }
 }
}
```

### 其他滤波

```java
void Filter2(int x)
{
 Mat temp = nowRate.clone();
 boxFilter(temp, nowRate, -1, Size(x, x)); // 方框滤波
}

void Filter3(int x)
{
 Mat temp = nowRate.clone();
 GaussianBlur(temp, nowRate, Size(x, x), 0, 0); // 高斯滤波
}

void Filter4(int x)
{
 Mat temp = nowRate.clone();
 // 中值滤波
 medianBlur(temp, nowRate, x);
}
```

## 运动目标检测

给定一段视频，编程实现帧差法或背景减法检测视频中的运动目标，并分析实验结果。

### 帧差法

```java
/*
 @ temp 临时帧
 @ frame 当前帧
 return result 帧差法运动目标检测结果，为每个运动目标加上绿色的矩形框
*/

Mat frameDiff(Mat temp, Mat frame)
{
 Mat result;
 // 将当前帧转换为灰度图像
 cvtColor(frame, frame, COLOR_BGR2GRAY);
 // 将临时帧转换为灰度图像
 cvtColor(temp, temp, COLOR_BGR2GRAY);
 // 将当前帧与临时帧进行帧差运算
 absdiff(frame, temp, result);
 // 将帧差运算结果二值化
 threshold(result, result, 50, 255, THRESH_BINARY);
 // 对二值化结果进行腐蚀膨胀运算
 //erode(result, result, Mat());
 //dilate(result, result, Mat());

 // 对二值化结果进行形态学开运算
 Mat kernel = getStructuringElement(MORPH_RECT, Size(3, 3));
 morphologyEx(result, result, MORPH_OPEN, kernel);
 // 对二值化结果进行形态学闭运算
 morphologyEx(result, result, MORPH_CLOSE, kernel);
 imshow("biyunsuan", result);
 // 查找二值化结果中的轮廓
 vector<vector<Point>> contours;
 findContours(result, contours, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
 // 遍历轮廓
 for (size_t t = 0; t < contours.size(); t++)
 {
  // 绘制轮廓
  drawContours(frame, contours, t, Scalar(0, 0, 255), 2);
  
  
  // 获取当前轮廓的矩形边界框
  Rect rect = boundingRect(contours[t]);
  // 如果在图形的上半部分，忽略小于  的框
  //if (rect.y < frame.rows / 4 && rect.area() < 500)
  // continue;
  //// 如果在图形的下半部分，忽略小于  的框
  //if (rect.y > frame.rows / 4 && rect.area() < 900)
  // continue;
  if (rect.area() < 400)
    continue;
  // 在当前帧中绘制矩形边界框
  rectangle(frame, rect, Scalar(0, 255, 0), 2, 8, 0);
 }
 return frame;
}
```

### 背景减法

```java
/*
 @ temp 临时帧
 @ frame 当前帧
 return result 检测结果，为每个运动目标加上绿色的矩形框,使用 BackgroundSubtractorMOG 函数
*/

Mat detectMotion(Mat frame) {
 Mat result;
 frame.copyTo(result);
 //创建背景减法器
 Ptr<BackgroundSubtractorMOG2> bgModel = createBackgroundSubtractorMOG2();
 //背景减法
 Mat fgMask;
 bgModel->apply(frame, fgMask);
 //膨胀
 Mat kernel = getStructuringElement(MORPH_RECT, Size(3, 3));
 dilate(fgMask, fgMask, kernel);
 imshow("fgmask", fgMask);
 //查找轮廓
 vector<vector<Point>> contours;
 findContours(fgMask, contours, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
 //绘制边缘
 for (size_t t = 0; t < contours.size(); t++)
 {
  // 绘制轮廓-红褐色
  drawContours(result, contours, t, Scalar(0, 0, 255), 2);
  //如果在图形的上1/3部分，忽略面积小于 400 的框
  Rect rect = boundingRect(contours[t]);
  if (rect.y < frame.rows / 4 && rect.area() < 200)
   continue;
  // 如果在图形的下2/3部分，忽略面积小于 1000 的框
  if (rect.y > frame.rows * 1 / 4 && rect.area() < 900)
   continue;

  rectangle(result, rect, Scalar(0, 255, 0), 2, 8, 0);

 }
 return result;
}
```

### 边缘检测

```java
/*
 @ temp 临时帧
 @ frame 当前帧
 return result 检测结果，为每个运动目标加上绿色的矩形框,使用 canny 算法
*/

Mat MotionDetectByCanny(Mat temp, Mat frame)
{
 Mat result;
 frame.copyTo(result);
 // 1. 将当前帧和临时帧转换为灰度图
 Mat gray1, gray2;
 cvtColor(temp, gray1, COLOR_BGR2GRAY);
 cvtColor(frame, gray2, COLOR_BGR2GRAY);
 // 2. 对当前帧和临时帧进行高斯滤波
 GaussianBlur(gray1, gray1, Size(3, 3), 0, 0);
 GaussianBlur(gray2, gray2, Size(3, 3), 0, 0);
 // 3. 对当前帧和临时帧进行运动目标检测
 Mat motion = gray1 - gray2;
 // 4. 对运动目标进行二值化处理
 threshold(motion, motion, 50, 255, THRESH_BINARY);
 // 5. 对二值化图像进行形态学操作
 Mat element = getStructuringElement(MORPH_RECT, Size(3, 3));
 morphologyEx(motion, motion, MORPH_OPEN, element);
 // 6. 对二值化图像进行边缘检测
 // 后面两个参数分别代表 threshold1 和 threshold2 的值以及 apertureSize
 Canny(motion, motion, 3, 9, 3);
 imshow("motion", motion);
 // 7. 查找轮廓
 vector<vector<Point>> contours;
 findContours(motion, contours, RETR_EXTERNAL, CHAIN_APPROX_NONE);
 // 8. 绘制轮廓
 for (size_t t = 0; t < contours.size(); t++)
 {
  // 绘制轮廓-红褐色
  drawContours(result, contours, t, Scalar(0, 0, 255), 2);
  //如果在图形的上1/3部分，忽略面积小于 400 的框
  Rect rect = boundingRect(contours[t]);
  if (rect.y < frame.rows / 4 && rect.area() < 200)
   continue;
  // 如果在图形的下2/3部分，忽略面积小于 1000 的框
  if (rect.y > frame.rows * 1 / 4 && rect.area() < 900)
   continue;
  
  rectangle(result, rect, Scalar(0, 255, 0), 2, 8, 0);

 }
 return result;
}
```

### 三帧差法

```java
Mat frameDiff3(Mat temp, Mat frame)
{
 Mat result;
 Mat gray1, gray2, gray3;
 Mat diff1, diff2, diff3;
 Mat diff;
 Mat threshold_output;
 vector<vector<Point> > contours;
 vector<Vec4i> hierarchy;
 int thresh = 100;
 int max_thresh = 255;
 RNG rng(12345);
 // 将当前帧转换为灰度图像
 cvtColor(temp, gray1, CV_BGR2GRAY);
 cvtColor(frame, gray2, CV_BGR2GRAY);
 absdiff(gray1, gray2, diff1); // 第一帧与第二帧的差
 cvtColor(frame, gray3, CV_BGR2GRAY);
 absdiff(gray2, gray3, diff2); // 第二帧与第三帧的差
 absdiff(diff1, diff2, diff3); // 两帧差的差
 threshold(diff3, threshold_output, thresh, 255, THRESH_BINARY);
 findContours(threshold_output, contours, hierarchy, CV_RETR_TREE, CV_CHAIN_APPROX_SIMPLE, Point(0, 0));
 imshow("threshold_output", threshold_output);
 vector<vector<Point> > contours_poly(contours.size());
 vector<Rect> boundRect(contours.size());
 // 遍历轮廓
 for (int i = 0; i < contours.size(); i++)
 {
  approxPolyDP(Mat(contours[i]), contours_poly[i], 3, true); // 多边形逼近
  boundRect[i] = boundingRect(Mat(contours_poly[i])); // 获取当前轮廓的矩形边界框
 }
 result = frame.clone();
 for (int i = 0; i < contours.size(); i++)
 {
  // 绘制轮廓-红褐色
  drawContours(result, contours_poly, i, Scalar(0, 0, 255), 1, 8, vector<Vec4i>(), 0, Point());

  //如果在图形的上1/3部分，忽略面积小于 400 的框
  if (boundRect[i].y < frame.rows / 4 && boundRect[i].area() < 200)
   continue;
  //如果在图形的下2/3部分，忽略面积小于 900 的框
  if (boundRect[i].y > frame.rows / 4 && boundRect[i].area() < 600)
   continue; 
  //if ( boundRect[i].area() < 200)
  // continue;
  
  rectangle(result, boundRect[i].tl(), boundRect[i].br(), Scalar(0, 255, 0), 2, 8, 0);
 }
 return result;
}
```
