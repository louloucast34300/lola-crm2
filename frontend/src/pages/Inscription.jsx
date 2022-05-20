import React from "react";

const Inscription = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <form action="/api/user" method="POST">
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="lastname" placeholder="lastname" />
            <input type="text" name="email" placeholder="email" />
            <input type="text" name="password" placeholder="password" />
            <input type="number" name="phone" placeholder="phone" />
            <button type="submit">valider</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
