import Marquee from 'react-fast-marquee'
import React from 'react'
import { Tooltip } from '@material-tailwind/react'

export interface TechStacks {
  name: string
  img: string
}

// const HoverTip = (item: TechStacks): JSX.Element => {
//   const [showTip, setShowTip] = useState(false)
//
//   return (
//     <div className="relative">
//       <div
//         className="absolute z-10 bg-white rounded-md shadow-md p-2 text-sm"
//         style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
//         onMouseEnter={() => setShowTip(true)}
//         onMouseLeave={() => setShowTip(false)}
//       >
//         {(Boolean(showTip)) && <div className="">{item.name}</div>}
//       </div>
//       <img src={item.img} alt={item.name} className={'w-20 h-20 mr-2 opacity-30 hover:opacity-60 transition-all ease-in-out duration-700'} />
//     </div>
//   )
// }

export function Stacks ({ stacks, direction }: { stacks: TechStacks[], direction: 'left' | 'right' }): JSX.Element {
  return (
    <Marquee gradient={false} speed={50} direction={direction}>
        <div className={'grid grid-flow-col auto-cols-max'}>
          {stacks.map((stack, index) => (
            <div key={index} className={'flex items-center mx-6'}>
              <Tooltip
                content={stack.name}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 }
                }}
                className={'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'}
              >
                <img src={stack.img} className={'w-20 h-20 mr-2 opacity-30 cursor-pointer hover:opacity-60 transition-all ease-in-out duration-700'} alt={stack.name} />
                {/* <div className={'text-sm'}>{stack.name}</div> */}
              </Tooltip>
            </div>
          ))}
        </div>
    </Marquee>
  )
}
