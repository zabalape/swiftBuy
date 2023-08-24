import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import CardUser from "../Cards/CardUser";

const ManageUser = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const getUsers = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get("http://localhost:3001/api/user");
        const users = json.data;
        return dispatch(setUser(users));
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const toggleAdminStatus = async (userId, newAdminStatus) => {
    try {
      await axios.put(`http://localhost:3001/api/user/update/${userId}`, {
        isAdmin: newAdminStatus,
      });
      dispatch(getUsers());
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  const toggleStatus = async (userId, newStatus) => {
    console.log(userId);
    try {
      await axios.put(`http://localhost:3001/api/user/update/${userId}`, {
        isDisable: newStatus,
      });
      dispatch(getUsers());
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  return (
    <div className="w-auto flex justify-center flex-col ">
      <h3 className="mt-6 text-xl">Users</h3>
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block w-full overflow-x-scroll sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
              <table className="min-w-full w-auto overflow-x-scroll divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {user
                  ?.slice()
                  .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar por nombres
                  .map((el) => (
                    <CardUser
                      key={el.id}
                      id={el.id}
                      toggleStatus={toggleStatus}
                      toggleAdminStatus={toggleAdminStatus}
                      name={el.name}
                      email={el.email}
                      image={el.photoURL}
                      isAdmin={el.isAdmin}
                      isDisable={el.isDisable}
                    />
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
