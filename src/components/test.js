<Navbar fixedTop={true} collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <span><img src={imageHome} className="imageLogo" /></span>
                            <a href="#brand">ONE Tech</a>
                        </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                Link
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Link
                            </NavItem>
                            <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Smartphone</MenuItem>
                                <MenuItem eventKey={3.2}>Laptop</MenuItem>
                                <MenuItem eventKey={3.3}>Game Console</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Semua Kategori</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Cari Produk" />
                            </FormGroup>{' '}
                            <Button type="submit" className="btn btn-success">Cari</Button>
                        </Navbar.Form>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                Register
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Login
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                