import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllPosts,
  setAllUserPosts,
  setAllUsers,
  setUserSelected,
} from "../../Slices/UserDirectorySlice";
import { useNavigate, useNavigation } from "react-router-dom";

const UserDirectory = () => {
  const { allUsers, allPosts, allUserPosts } = useSelector(
    (state) => state.userDirectorySlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await getAllUsers();
    await getAllPosts();
  };

  useEffect(() => {
    if (allUsers.length > 0 && allPosts.length > 0) {
      var newUsers = [];
      allUsers?.map((item) => {
        const posts = allPosts?.filter((post) => post?.userId === item?.id);
        item = { ...item, posts: posts };
        newUsers.push(item);
      });
      dispatch(setAllUserPosts(newUsers));
    }
  }, [allUsers, allPosts]);

  const getAllUsers = async () => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
      }).then((Response) => {
        var response = Response.json();
        response.then((value) => {
          dispatch(setAllUsers(value));
        });
      });
    } catch (error) {}
  };

  const getAllPosts = async () => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
      }).then((Response) => {
        var response = Response.json();
        response.then((value) => {
          dispatch(setAllPosts(value));
        });
      });
    } catch (error) {}
  };

  const gotToUserProfile = (user) => {
    dispatch(setUserSelected(user));
    navigate("/UserInfo");
  };

  return (
    <div className="w-full  h-full">
      <div className="flex flex-col gap-4 px-4 py-2">
        <div className="text-center font-bold text-2xl">Directory</div>
        <div className="max-[800px]: overflow-y-auto flex flex-col gap-3">
          {allUserPosts?.map((item) => {
            return (
              <div
                className="bg-slate-300 border border-gray-950 rounded-lg px-2 py-3"
                onClick={() => gotToUserProfile(item)}
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <div>Name</div>
                    <div>{item?.name}</div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div>Posts</div>
                    <div>{item?.posts?.length}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
