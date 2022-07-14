import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {
  Box,
  Container,
  Typography,
  Grid,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  Button,
  Divider,
  ListItem
} from '@mui/material';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const [openHighLight, setOpenHighLight] = React.useState(false);
  const [openRevenue, setOpenRevenue] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openMore, setOpenMore] = React.useState(false);
  const getHighLight = () => {
    setOpenHighLight(!openHighLight);
    setOpenCategory(false);
    setOpenRevenue(false);
    setOpenMore(false);
  };

  const getRevenue = () => {
    setOpenRevenue(!openRevenue);
    setOpenHighLight(false);
    setOpenCategory(false);
    setOpenMore(false);
  };

  const getMore = () => {
    setOpenMore(!openMore);
    setOpenHighLight(false);
    setOpenCategory(false);
    setOpenRevenue(false);
  };

  const getCategory = () => {
    setOpenCategory(!openCategory);
    setOpenHighLight(false);
    setOpenRevenue(false);
    setOpenMore(false);
  };
  const handleClick = (f: VoidFunction) => {
    f();
  };
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '300px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Box>
              <Collapse in={openHighLight} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="$5M+ raised" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="$10M+ raised" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="$20M+ raised" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="10-24 employees" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="25-49 employees" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Power Founders" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Notable Angel backing" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>
            <Box>
              <Collapse in={openRevenue} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, mr: 6 }}>
                    <ListItemText primary="$5M+ raised" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, mr: 4 }}>
                    <ListItemText primary="$10M+ raised" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, mr: 4 }}>
                    <ListItemText primary="$20M+ raised" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, mr: 4 }}>
                    <ListItemText primary="$5M+ revenue" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, mr: 2 }}>
                    <ListItemText primary="$10M+ revenue" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="$20M+ revenue" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, mr: 1.8 }}>
                    <ListItemText primary="$120M+ revenue" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="$200M+ revenue" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>
            <Box>
              <Collapse in={openMore} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Typography sx={{ fontWeight: '700', textAlign: 'center' }}>Impact</Typography>
                  <ListItemButton>
                    <ListItemText primary="Diverse Founders" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="Social Impact" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="Sustainability" />
                  </ListItemButton>
                </List>
                <Divider orientation="vertical">|</Divider>
                <List component="div" disablePadding>
                  <Typography sx={{ fontWeight: '700' }}>Business model</Typography>
                  <ListItemButton>
                    <ListItemText primary="B2B" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="B2C" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="Creator Economy" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="D2C" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="Marketplace" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="SaaS" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="Subscription" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <Typography sx={{ fontWeight: '700', textAlign: 'center' }}>
                    Valuation cap
                  </Typography>
                  <ListItemButton>
                    <ListItemText primary="$5M and under" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="$5–10M" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="$10–20M" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="$20M+" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <Typography sx={{ fontWeight: '700' }}>Min. investment</Typography>
                  <ListItemButton>
                    <ListItemText primary="$100 and under" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="$101–$250" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="$250+" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <Typography sx={{ fontWeight: '700' }}>Company location</Typography>
                </List>
              </Collapse>
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
