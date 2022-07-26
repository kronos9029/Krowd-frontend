// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BusinessProjectForm } from '../../components/_dashboard/project';

// ----------------------------------------------------------------------

export default function KrowdNewProject() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo mới dự án| Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo mới dự án"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Dự án mới' }]}
        />
        <BusinessProjectForm />
      </Container>
    </Page>
  );
}
