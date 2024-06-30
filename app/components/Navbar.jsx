const Navbar = () => {
  return (
    <div className="container bg-red-200 flex p-8">
      <div className="flex">Forecaster</div>
      <div className="flex justify-center align-center">
        <input className="outline-none rounded-xl p-2" type="text" placeholder="search by city..."  />
      </div>
    </div>
  );
};

export default Navbar;
