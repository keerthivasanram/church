import congregation from '../assets/images/sliders/WhatsApp Image 2026-07-29 at 10.22.54 (1).jpeg'
import altar from '../assets/images/sliders/WhatsApp Image 2026-07-29 at 10.22.54.jpeg'
import teaching from '../assets/images/sliders/WhatsApp Image 2026-07-29 at 10.22.53.jpeg'
import glory from '../assets/images/sliders/WhatsApp Image 2026-07-29 at 10.22.51.jpeg'
import promise from '../assets/images/sliders/WhatsApp Image 2026-07-29 at 10.23.20.jpeg'

/**
 * The hero's plate — five photographs from the meetings, dealt slowly behind
 * the type. `focus` is the object-position of each in a wide, overscanned
 * frame, chosen so faces and banners survive the crop. Captions describe only
 * what is in the frame; nothing is claimed that the photograph does not show.
 */
export const heroSlides = [
  {
    src: congregation,
    numeral: 'I',
    title: 'The Gathered Church',
    caption: 'A hall filled, the cross standing behind the platform',
    focus: '50% 44%',
    dim: 0.66,
  },
  {
    src: altar,
    numeral: 'II',
    title: 'Prayer & Impartation',
    caption: 'Ministering at the altar, hand lifted to heaven',
    focus: '54% 40%',
    dim: 0.6,
  },
  {
    src: teaching,
    numeral: 'III',
    title: 'Opening the Word',
    caption: 'The Scriptures taught, the Book open on the pulpit',
    focus: '50% 46%',
    dim: 0.56,
  },
  {
    src: glory,
    numeral: 'IV',
    title: 'You Would See the Glory',
    caption: 'After the meeting, beneath the promise of John 11:40',
    focus: '52% 52%',
    dim: 0.5,
  },
  {
    src: promise,
    numeral: 'V',
    title: 'Upon This Rock',
    caption: 'Among the churches — one body, many tongues',
    focus: '52% 44%',
    dim: 0.54,
  },
]

export default heroSlides
