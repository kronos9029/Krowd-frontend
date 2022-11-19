import { Box, Grid, styled, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useState } from 'react';
import _ from 'lodash';
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

type UpdateProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
  updateDate: string;
};
type UpdateNewsListProps = {
  updates: UpdateProps[];
};
function ProjectDetailUpdateNews({ updates }: UpdateNewsListProps) {
  return (
    <>
      {updates &&
        updates.map(
          (v, i) =>
            v && (
              <Box key={i} my={5} py={0.4}>
                <Grid container>
                  <Box pb={2}>
                    <Box>
                      <Box display={'flex'}>
                        <Box>
                          {v.updateDate.toString().substring(0, 5)}
                          <br />
                          <Typography
                            sx={{ fontSize: '13px', textAlign: 'right' }}
                            color={'GrayText'}
                          >
                            {v.updateDate.toString().substring(6, 10)}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="h4" color={'#666'} height={50}>
                            <Box mx={2}>{`${v.title}`}</Box>
                          </Typography>

                          <Grid xs={12} sm={9} md={11} lg={11}>
                            <Box mx={2} display={'flex'}>
                              {v.content && <FixQL>{parse(v.content)}</FixQL>}
                            </Box>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            )
        )}
    </>
  );
}
export default ProjectDetailUpdateNews;
