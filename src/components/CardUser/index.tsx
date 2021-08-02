import React from "react";

interface IUserProps {
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

interface IProps {
  user: IUserProps;
  handleDelete: (id: number) => {};
  handleEditUser: (user: IUserProps) => void;
}

const CardUser: React.FC<IProps> = ({
  user,
  handleDelete,
  handleEditUser,
}: IProps) => {
  function setEditingUser(): void {
    handleEditUser(user);
  }

  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
      <figure className="user-card green">
        <figcaption>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Milestone Admin"
            className="profile"
          />
          <h5 style={{ wordWrap: "break-word" }}>{user.name}</h5>
          <h6>CPF: {user.document}</h6>
          <ul className="contacts">
            <li>
              <a href="#!" style={{ wordWrap: "break-word", fontSize: 14 }}>
                {user.email}
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(user.id)}
            data-testid={`remove-user-${user.id}`}
            style={{ marginRight: 5 }}
          >
            <i className="fa fa-trash"></i>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setEditingUser()}
            data-testid={`edit-user-${user.id}`}
          >
            <i className="fa fa-pencil"></i>
          </button>
        </figcaption>
      </figure>
    </div>
  );
};

export default CardUser;
