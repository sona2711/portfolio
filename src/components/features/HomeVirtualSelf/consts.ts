import type { VirtualChatMessage } from './types'

export const VIDEO_SOURCE =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export const VIDEO_TITLE = 'Interactive AI Introduction'
export const VIDEO_SUBTITLE = 'Watch my virtual self explain my development philosophy.'
export const VIDEO_TIMER = '00:42 / 02:15'

export const CHAT_TITLE = 'Meet My Virtual Self'
export const CHAT_STATUS = 'ONLINE & RESPONSIVE'
export const CHAT_INPUT_PLACEHOLDER = 'Type a message...'

export const CHAT_MESSAGES: VirtualChatMessage[] = [
  {
    text: "Hi there! I'm Sona's virtual twin. I'm trained on her resume and coding projects. Ask me anything about her skills or experience!",
    variant: 'neutral',
  },
  {
    text: 'What frameworks are you most comfortable with?',
    variant: 'accent',
  },
  {
    text: 'I specialize in Angular 2+, React.js, and modern JavaScript. I also have experience with robotics using Arduino and Raspberry Pi.',
    variant: 'neutral',
  },
]
