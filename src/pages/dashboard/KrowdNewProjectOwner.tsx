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
import { KrowdNewProjectOwnerForm } from '../../components/_dashboard/project/projectEntity';
// ----------------------------------------------------------------------

export default function KrowdNewProjectOwner() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo mới quản lý dự án| Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo mới quản lý"
          links={[{ name: 'Bảng điều khiển', href: PATH_DASHBOARD.root }, { name: 'Quản lý' }]}
        />
        <KrowdNewProjectOwnerForm />
      </Container>
    </Page>
  );
}
