import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([])

    // ce hook s'execute une seule fois grace au tableau vide (deuxieme parametre)
    useEffect(() => {
        fetch('http://localhost:3001/users', {
            credentials: "include"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setUsers(data)
        })
    }, [])

    return (
        <div className="Users">
            <div className='table'>
                <div className='table-row'>
                    <div className='table-column'>
                        nom
                    </div>
                    <div className='table-column'>
                        email
                    </div>
                    <div className='table-column'>
                        role
                    </div>
                </div>
                {
                    users.map((user) => {
                        return <div className='table-row'>
                            <div className='table-column'>{user.name}</div>
                            <div className='table-column'>{user.email}</div>
                            <div className='table-column'>{user.role}</div>
                            <div className='table-column'>
                                <button
                                    onClick={() => {
                                        // appel du backend route de suppression de user
                                        fetch('http://localhost:3001/users/' + user.id, {
                                            method: "DELETE", credentials: "include"
                                        }).then(() => {
                                            // recuperation de la nouvelle liste des programmes sans celui qu'on a supprimer
                                            fetch('http://localhost:3001/users', {
                                                credentials: "include"
                                            }).then((response) => {
                                                return response.json()
                                            }).then((data) => {
                                                setUsers(data)
                                            })
                                        })
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Users;
