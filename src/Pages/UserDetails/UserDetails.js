import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCountries,
  setUserSelected,
} from "../../Slices/UserDirectorySlice";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const UserDetails = () => {
  const { userSelected, allCountries } = useSelector(
    (state) => state.userDirectorySlice
  );
  const [country, setCountry] = useState("");
  const [time, seTime] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await getCountries();
  };

  const getCountries = async () => {
    try {
      await fetch("http://worldtimeapi.org/api/timezone", {
        method: "GET",
      }).then((Response) => {
        var response = Response.json();
        response.then((value) => {
          dispatch(setAllCountries(value));
        });
      });
    } catch (error) {}
  };

  const getCurrentTime = async (e) => {
    setCountry(e?.target?.value);
    try {
      await fetch(`http://worldtimeapi.org/api/timezone/${e?.target?.value}`, {
        method: "GET",
      }).then((Response) => {
        var response = Response.json();
        response.then((value) => {
          console.log(
            "🛵🦽 ~ file: UserDetails.js:42 ~ response.then ~ value:",
            value
          );
          seTime(value?.datetime);
        });
      });
    } catch (error) {}
  };

  const goBack = () => {
    dispatch(setUserSelected({}));
    navigate("/");
  };

  return (
    <div className="w-full  h-full">
      <div className="flex flex-col gap-10 px-4 py-2">
        <div className="flex flex-col sm:flex-row justify-between">
          <div
            className="bg-sky-400 border border-gray-700 rounded-lg px-4 py-1 my-auto"
            onClick={() => goBack()}
          >
            Back
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div>
              <select
                className="border border-gray-200 rounded-md py-2"
                value={country}
                onChange={(e) => getCurrentTime(e)}
              >
                <option disabled selected value="">
                  select
                </option>
                {allCountries?.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="border border-gray-100 bg-slate-900 text-white py-3 px-5">
              {moment(time).format("h:mm:ss")}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-4">
          <div className="text-center font-bold text-2xl">Profile Page</div>
          <div className="flex flex-row justify-between py-3 px-2 items-center border border-gray-300 rounded-md">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-4">
                <div className="text-base font-semibold w-1/3">Name</div>
                <div className="w-2/3">{userSelected?.name}</div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="text-base font-semibold w-1/3">Username</div>
                <div className="w-2/3">{userSelected?.username}</div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="text-base font-semibold w-1/3">
                  Catch Phrase
                </div>
                <div className="w-2/3">
                  {userSelected?.company?.catchPhrase}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-4">
                <div className="text-base font-semibold w-1/3">Address</div>
                <div className="w-2/3">{`${userSelected?.address?.suite} ${userSelected?.address?.street} ${userSelected?.address?.city} ${userSelected?.address?.zipcode}`}</div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="text-base font-semibold w-1/3">Email</div>
                <div className="w-2/3">{userSelected?.email}</div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="text-base font-semibold w-1/3">Phone</div>
                <div className="w-2/3">{userSelected?.phone}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {userSelected?.posts?.map((item) => {
              return (
                <div className="border border-gray-300 px-4 py-2 flex flex-col gap-3 rounded-md bg-cyan-100">
                  <div className="flex flex-row gap-3">
                    <div className="font-semibold text-lg w-1/6">Posts</div>
                    <div className="w-10/12">{item?.title}</div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="font-semibold text-lg w-1/6">Content</div>
                    <div className="w-10/12">{item?.body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
