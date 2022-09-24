import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  styled,
  Typography
} from '@mui/material';
import exclamationCircleOutlined from '@iconify/icons-ant-design/exclamation-circle-outlined';

import { useState } from 'react';
import { Icon } from '@iconify/react';
const AccordionStyle = styled(Accordion)(() => ({
  '&.noBorder': {
    boxShadow: 'none',
    paddingLeft: 0
  }
}));
type ExtensionProps = {
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type ExtensionListProps = {
  extensions: ExtensionProps[];
};
function ProjectDetailExtension({ extensions }: ExtensionListProps) {
  const [expanded, setExpanded] = useState(-1);

  const handleChange = (panel: number, isCollapse: boolean) => {
    if (isCollapse || panel === -1) setExpanded(panel);
  };
  return (
    <>
      <Box width={'fit-content'}>
        <Typography variant="h4" sx={{ mb: 1 }} color={'#666'}>
          Thông tin mở rộng
        </Typography>
        <Box width={'25%'}>
          <Divider variant="fullWidth" />
        </Box>
      </Box>
      <Box>
        {extensions.map((v, i) => {
          const isHaveDescription = v.description !== null;
          const isExpanded = expanded === i;
          return (
            <Box key={i} my={1}>
              <AccordionStyle
                elevation={0}
                expanded={isExpanded}
                onMouseOver={() => handleChange(i, isHaveDescription)}
                classes={{ root: 'noBorder' }}
                onMouseLeave={() => handleChange(-1, isHaveDescription)}
              >
                <AccordionSummary id={v.title} sx={{ p: 0 }}>
                  <Box>
                    <Box display={'flex'} alignItems={'flex-end'}>
                      <Typography variant="body2">{v.title}</Typography>
                      {isHaveDescription && (
                        <Typography ml={1} color={isExpanded ? 'primary.main' : 'text.secondary'}>
                          <Icon icon={exclamationCircleOutlined} width={17} />
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body1" fontWeight={'bold'} mt={1}>
                      {v.content}
                    </Typography>
                  </Box>
                </AccordionSummary>
                {isHaveDescription && (
                  <AccordionDetails sx={{ p: 0 }}>
                    <Typography>{v.description}</Typography>
                  </AccordionDetails>
                )}
              </AccordionStyle>
              <Box width={'60%'}>
                <Divider variant="fullWidth" sx={{ my: 0.5 }} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
export default ProjectDetailExtension;
