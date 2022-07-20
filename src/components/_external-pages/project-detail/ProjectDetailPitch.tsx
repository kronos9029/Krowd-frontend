import { Box, Divider, styled, Typography } from '@mui/material';
import parse from 'html-react-parser';
const FixQL = styled('div')(() => ({
  '.ql-align-center': {
    textAlign: 'center'
  },
  '.ql-align-right': {
    textAlign: 'right'
  },
  '.ql-align-jutify': {
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
const PitchTopAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-100px',
  visibility: 'hidden'
}));
const PitchBottomAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '10px',
  visibility: 'hidden'
}));
const PitchTopClickAnchor = styled('div')(() => ({
  display: 'block',
  position: 'relative',
  top: '-140px',
  visibility: 'hidden'
}));
type PitchProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
type PitchListProps = {
  pitchs: PitchProps[];
};
function ProjectDetailPitch({ pitchs }: PitchListProps) {
  return (
    <>
      {pitchs &&
        pitchs.map(
          (v, i) =>
            v && (
              <Box key={i}>
                <PitchTopAnchor id={`__pitchTop_${v.id}`}></PitchTopAnchor>
                <Box py={2}>
                  <Typography variant="h3" color={'text.secondary'} height={50}>
                    {v.title}
                    <Box width={'10%'}>
                      <PitchTopClickAnchor id={`__pitchTopClick_${v.id}`}></PitchTopClickAnchor>
                      <Divider variant="fullWidth" sx={{ my: 1 }} />
                    </Box>
                  </Typography>
                </Box>
                {v.content && <FixQL>{parse(v.content)}</FixQL>}
                <PitchBottomAnchor id={`__pitchBottom_${v.id}`}></PitchBottomAnchor>
              </Box>
            )
        )}
    </>
  );
}
export default ProjectDetailPitch;
