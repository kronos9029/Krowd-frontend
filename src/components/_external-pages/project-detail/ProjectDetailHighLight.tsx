import { Icon } from '@iconify/react';
import { Box, Divider, styled, Typography } from '@mui/material';
import parse from 'html-react-parser';

import starFilled from '@iconify/icons-ant-design/star-filled';
const FixQL = styled('div')(() => ({
  '.ql-align-center': {
    textAlign: 'center'
  },
  '.ql-align-right': {
    textAlign: 'right'
  },
  '.ql-align-justify': {
    textAlign: 'justify'
  },
  blockquote: {
    background: '#f9f9f9',
    borderLeft: '10px solid #ccc',
    margin: '1.5em 10px',
    padding: '0.5em 10px',
    quotes: '201C 201D 2018 2019'
  },
  'blockquote:before': {
    color: '#ccc',
    content: 'open-quote',
    fontSize: '4em',
    lineHeight: '0.1em',
    marginRight: '0.25em',
    verticalAlign: '-0.4em'
  },
  'blockquote p': {
    display: 'inline'
  },
  '.ql-video': {
    width: '100%',
    height: '500px'
  }
}));

type HighlightProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
type HighlightListProps = {
  highlights: HighlightProps[];
};
function ProjectDetailHighLight({ highlights }: HighlightListProps) {
  const getHighLightListByTitle = (title: 'List' | 'Card') => {
    if (!highlights) return;
    return highlights.find((value) => value.title === title);
  };

  const { list } = {
    list: getHighLightListByTitle('List')
  };
  return (
    <>
      {highlights &&
        highlights.length > 0 &&
        highlights.map((v, i) => {
          return (
            <Box key={i}>
              <Box pb={5} display={'flex'}>
                <Typography variant="h4" color={'#666'} height={50}>
                  <Icon
                    icon={starFilled}
                    style={{
                      marginRight: 10,
                      marginBottom: 5,
                      color: '#14B7CC'
                    }}
                  />
                  Điểm nổi bật
                  <Box width={'33%'}>
                    <Divider variant="fullWidth" sx={{ my: 1, opacity: 0.1 }} />
                  </Box>
                </Typography>
              </Box>
              <Typography sx={{ pb: 0.1 }} variant="h6" color={'text.secondary'} fontWeight={100}>
                {list && list.content && <FixQL>{parse(list.content)}</FixQL>}
              </Typography>
            </Box>
          );
        })}
    </>
  );
}
export default ProjectDetailHighLight;
