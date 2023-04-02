export interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: null
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: null
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: any[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

export interface Project {
  banner: string
  name: string
  link: string
  desc: string
  repo: string
  username: string
}

export interface NavItem {
  name: string
  link: string
  desc: string
  type: 'nav' | 'friend'
  avatar?: string
}

export interface NavCatagory {
  id: number
  name: string
  desc: string
  navs: NavItem[]
}

// 解析上面注释中的数据
export interface TypeLeaf {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  body: string
  mainImage: {
    _type: string
    _upload: {
      createdAt: string
      file: {
        name: string
        type: string
      }
      previewImage: string
      progress: number
      updatedAt: string
    }
  }
  name: string
}

export interface TypeLark {
  creator: string
  has_child: boolean
  node_create_time: string
  node_token: string
  node_type: string
  obj_create_time: string
  obj_edit_time: string
  obj_token: string
  obj_type: string
  origin_node_token: string
  origin_space_id: string
  owner: string
  parent_node_token: string
  space_id: string
  title: string
}

export interface Context {
  title: string
  children: contextItems[]
}

export interface contextItems {
  title: string
  children: contextChild[]
}

export interface contextChild {
  link: string
  title: string
}
