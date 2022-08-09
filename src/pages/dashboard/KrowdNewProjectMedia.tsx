// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import React from 'react';

import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProjectEntitytMediaForm } from '../../components/_dashboard/project/projectEntity';
// ----------------------------------------------------------------------

export default function KrowdNewProjectMedia() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo mới truyền thông| Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thông tin truyền thông"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Thông tin' }]}
        />
        <ProjectEntitytMediaForm />
      </Container>
    </Page>
  );
}
