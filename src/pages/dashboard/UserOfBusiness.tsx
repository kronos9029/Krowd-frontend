import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import closeFill from '@iconify/icons-eva/close-fill';

// material
import { Container, Box } from '@mui/material';
// routes
import Page from '../../components/Page';
import ProjectTable from '../../components/table/ProjectTable';
// components
// ----------------------------------------------------------------------

const TABLE_HEAD_NONE = [
  { id: 'email', label: 'EMAIL', alignRight: false },
  { id: 'name', label: 'TÊN DOANH NGHIỆP', alignRight: false },
  { id: '', label: 'THAO TÁC', alignRight: false }
];

// ----------------------------------------------------------------------

export default function UserListOfBusiness() {
  return (
    <Page title="Doanh nghiệp: Danh sách | Krowd">
      <Container maxWidth={false}>
        <Box mb={5}>
          <ProjectTable />
        </Box>
      </Container>
    </Page>
  );
}
