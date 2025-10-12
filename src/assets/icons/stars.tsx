import type { IconProps } from '@/types'

export const StarsPattern = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      {/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
      <pattern
        id="a"
        width={40}
        height={40}
        patternTransform="scale(2)"
        patternUnits="userSpaceOnUse"
      >
        <rect width="100%" height="100%" fill="#2b2b31" />
        <path
          fill="none"
          stroke="#e0f2fe"
          strokeLinecap="square"
          d="m23.222 25.097-3.266-2.056-3.219 2.058.983-3.847-3.042-2.503 3.936-.18 1.52-3.668 1.342 3.578 3.846.312-2.996 2.505z"
        />
        <path
          fill="none"
          stroke="#67e8f9"
          strokeLinecap="square"
          d="m.133-5.1-1.52 3.668-3.935.18 3.043 2.504-.985 3.848 3.221-2.06 3.264 2.057-.895-3.803L5.322-1.21l-3.845-.312zm40 0-1.52 3.668-3.935.18 3.043 2.504-.985 3.848 3.221-2.059 3.264 2.057-.895-3.803 2.996-2.504-3.845-.312zm-40 40-1.52 3.668-3.935.18 3.043 2.504-.985 3.848 3.221-2.059 3.264 2.057-.895-3.803 2.996-2.504-3.845-.312zm40 0-1.52 3.668-3.935.18 3.043 2.504-.985 3.848 3.221-2.059 3.264 2.057-.895-3.803 2.996-2.504-3.845-.312z"
        />
      </pattern>
    </defs>
    <rect width="800%" height="800%" fill="url(#a)" />
  </svg>
)
