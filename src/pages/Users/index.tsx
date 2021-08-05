import React, { useState, useEffect } from "react";
import api from "../../services/api";

import Header from "../../components/Header";
import Saudation from "../../components/Saudation";
import ModalAddUser from "../../components/ModalAddUser";
import ModalEditUser from "../../components/ModalEditUser";
import CardUser from "../../components/CardUser";
import ButtonAddUser from "../../components/ButtonAddUser";

interface IUser {
  id: number;
  name: string;
  document: string;
  pis: string;
  email: string;
  password: string;
  zipcode: number;
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  country: string;
}

const Users: React.FC = () => {
  const [username, setUserName] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser>({} as IUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadUsers(): Promise<void> {
      const response = await api.get("/users");
      setUsers(response.data);

      const token = localStorage.getItem("@newmission:data");
      const username = JSON.parse(`${token}`);
      setUserName(username.user.name);
    }

    loadUsers();
  }, []);

  async function handleAddUser(
    user: Omit<IUser, "id" | "updated_at">
  ): Promise<void> {
    try {
      const response = await api.post("users", user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateUser(
    user: Omit<IUser, "id" | "created_at" | "updated_at">
  ): Promise<void> {
    try {
      const response = await api.put(`/users/${editingUser.id}`, user);

      setUsers(
        users.map((mappedUser) =>
          mappedUser.id === editingUser.id ? { ...response.data } : mappedUser
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditUser(user: IUser): void {
    setEditingUser(user);
    toggleEditModal();
  }

  return (
    <>
      <Header />

      <div className="container">
        <ModalAddUser
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddUser={handleAddUser}
        />

        <ModalEditUser
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingUser={editingUser}
          handleUpdateUser={handleUpdateUser}
        />

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Saudation title="Olá," subtitle={`${username}`} />

            <ButtonAddUser openModal={toggleModal} />
          </div>
        </div>

        <div className="row mt-3" data-testid="user-list">
          {users &&
            users.map((user) => (
              <CardUser
                key={`userId${user.id}`}
                user={user}
                handleDelete={handleDeleteUser}
                handleEditUser={handleEditUser}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Users;
