import {
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

export const DATA_ACTIONS = [
  {
    title: 'H1',
    value: 'H1',
    type: 'h1',
    id: '01',
  },
  {
    title: 'H2',
    value: 'H2',
    type: 'h2',
    id: '02',
  },
  {
    title: 'H3',
    value: 'H3',
    type: 'h3',
    id: '03',
  },
  {
    title: 'Bold',
    value: 'B',
    type: 'bold',
    id: '04',
  },
  {
    title: 'Italic',
    value: 'I',
    type: 'italic',
    id: '05',
  },
  {
    title: 'Link',
    value: <AiOutlineLink />,
    type: 'link',
    id: '07',
  },
  {
    title: 'Unordered-list',
    value: <AiOutlineUnorderedList />,
    type: 'unordered-list',
    id: '08',
  },
  {
    title: 'Ordered-list',
    value: <AiOutlineOrderedList />,
    type: 'ordered-list',
    id: '09',
  },
];
