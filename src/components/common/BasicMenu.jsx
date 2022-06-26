import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from "./Button";
import {Link} from "react-router-dom";

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                메뉴
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to={"/books/search"}>
                        책 등록
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to={"/me"}>
                        등록한 책
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to={"/me/client"}>
                        빌린 책
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}
