import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Cookies } from "react-cookie";
import api from "../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookie = new Cookies();
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser>({} as IUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    const dataStorage = localStorage.getItem("@newmission:data");
    const username = JSON.parse(`${dataStorage}`);
    setUserName(username.user.name);

    const token = cookie.get("@newmission:access_token");
    if (!token) {
      setAuthorized(false);
    }

    async function loadUsers(): Promise<void> {
      try {
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadUsers();
    loadToastInitial();
    redirectPage();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function redirectPage() {
    if (authorized) {
      return;
    } else {
      localStorage.removeItem("@newmission:data");
      cookie.remove("@newmission:access_token");
      history.replace("/");
    }
  }

  async function handleUpdateUser(
    user: Omit<IUser, "id" | "created_at" | "updated_at">
  ): Promise<void> {
    try {
      const token = cookie.get("@newmission:access_token");
      const response = await api.put(`/users/${editingUser.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const token = cookie.get("@newmission:access_token");
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    setEditingUser({ ...user, password: "" });
    toggleEditModal();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function loadToastInitial() {
    const toastSessionStorage = sessionStorage.getItem("@newmission:toast");

    if (!toastSessionStorage) {
      const dataStorage = localStorage.getItem("@newmission:data");
      const data = JSON.parse(`${dataStorage}`);

      toast(`🎉 Seja Bem-vindo(a) ${data.user.name}`, {
        position: "top-right",
      });

      /* Create cookie */
      sessionStorage.setItem("@newmission:toast", "true");
    }
  }

  return (
    <>
      <ToastContainer />

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
