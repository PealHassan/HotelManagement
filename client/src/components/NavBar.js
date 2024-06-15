import React from 'react'

function NavBar() {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Hotel Management</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            {user ? (<>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className='fa fa-user'></i>  {user.name}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {user.isAdmin ? (<>
                                            <li><a class="dropdown-item" href="/dashboard">Dashboard</a></li>
                                            <li><a class="dropdown-item" href="/register">Add New Manager</a></li>
                                        </>) : <></>
                                        }
                                        <li><a class="dropdown-item" href="/home">Book Room</a></li>
                                        <li><a class="dropdown-item" href="/addTicket">Tickets</a></li>
                                        <li><a class="dropdown-item" href="/addPackage">Add Package</a></li>
                                        <li><a class="dropdown-item" href="/addNewRoom">Add New Room</a></li>
                                        <li><a class="dropdown-item" href="#" onClick={logout}>Log Out</a></li>

                                    </ul>
                                </div>
                            </>) : (<>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/login">Log In</a>
                                </li>
                            </>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
