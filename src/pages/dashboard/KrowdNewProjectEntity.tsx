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
import { ProjectEntitytForm } from '../../components/_dashboard/project/projectEntity';
// ----------------------------------------------------------------------

export default function KrowdNewProjectEntity() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo mới tiêu điểm| Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo mới tiêu điểm"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Nổi bật mới' }]}
        />
        <ProjectEntitytForm />
      </Container>
    </Page>
  );
}
