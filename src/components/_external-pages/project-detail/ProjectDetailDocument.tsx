import profileOutlined from '@iconify/icons-ant-design/profile-outlined';
import { Icon } from '@iconify/react';
import { Box, Divider, Typography, Link as MuiLink } from '@mui/material';

type DocumentProps = {
  id: string;
  title: string;
  link: string;
  content: string;
  description: string;
};
type DocumentListProps = {
  documents: DocumentProps[];
};
function ProjectDetailDocument({ documents }: DocumentListProps) {
  return (
    <>
      <Box>
        <Typography sx={{ mt: 8 }} variant="h4" color={'#666'}>
          Tài liệu
        </Typography>
        <Box width={'18%'}>
          <Divider variant="fullWidth" sx={{ my: 1, mb: 3 }} />
        </Box>
      </Box>
      <Box border={'thin double'} borderRadius={1} borderColor="#eee" py={2} px={2}>
        <Typography variant="body2" color={'text.secondary'}>
          Tài liệu doanh nghiệp
        </Typography>
        {documents.map((v, i) => (
          <Box
            display={'flex'}
            sx={{ '&:hover': { backgroundColor: '#eee' } }}
            key={i}
            my={2}
            height={50}
            alignItems="center"
          >
            <MuiLink
              color={'text.primary'}
              fontWeight="bold"
              underline="none"
              href={v.link || '#'}
              target="_blank"
            >
              <Icon icon={profileOutlined} width={30} style={{ marginRight: '15px' }} />
              {v.title}
            </MuiLink>
          </Box>
        ))}
      </Box>
    </>
  );
}
export default ProjectDetailDocument;
