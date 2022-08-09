import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// icons
import eyeFill from '@iconify/icons-eva/eye-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

type ProjectMoreMenuProps = {
  onView: VoidFunction;
  //   onDelete: VoidFunction;
};

function ProjectMoreMenu({ onView }: ProjectMoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        ref={ref}
        component={RouterLink}
        to={`${PATH_DASHBOARD.projectsBusiness.projectBusinessDetails}`}
        sx={{ color: 'text.secondary' }}
        onClick={onView}
      >
        <Icon icon={eyeFill} width={20} height={20} />
      </IconButton>
    </>
  );
}
function ProjectEntityMoreMenu({ onView }: ProjectMoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        ref={ref}
        component={RouterLink}
        to={`${PATH_DASHBOARD.projectsBusiness.projectBusinessDetails}`}
        sx={{ color: 'text.secondary' }}
        onClick={onView}
      >
        <Icon icon={eyeFill} width={20} height={20} />
      </IconButton>
    </>
  );
}
export default ProjectMoreMenu;
