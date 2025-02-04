'use client';

import { useEffect, useState } from "react";
import { getUsers, createUser, User, updateUser, deleteUser } from "./api";
import { UserForm } from "./UserForm";
import { UsersMap } from "./UsersMap";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>();
  const [zipcode, setZipcode] = useState<number>();
  
  const [showCreate, setShowCreate] = useState(false);
  const [createError, setCreateError] = useState<string | undefined>();

  const [updateError, setUpdateError] = useState<string | undefined>();
  const [editingUser, setEditingUser] = useState<User | undefined>();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    getUsers().then((users) => setUsers(users));
  }

  const handleCreateUser = () => {
    if (name && zipcode) {
      const user: User = {
        name,
        zipcode: zipcode,
      };
      createUser(user).then((user) => {
        if (user.error) setCreateError(`Error creating user: ${user.error}`);
        else {
          handleClearCreateUser();
          fetchAllUsers();
        }
      });
    }
  };

  const handleClearCreateUser = () => {
    setName(undefined);
    setZipcode(undefined);
    setShowCreate(false);
  }

  const handleShowCreateUser = () => {
    setShowCreate(!showCreate);
    setEditingUser(undefined);
  }

  const handleSetEditingUser = (user: User) => {
    setShowCreate(false);
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (editingUser?._id && editingUser.name && editingUser.zipcode) {
      updateUser(editingUser._id, editingUser).then((user) => {
        if (user.error) setUpdateError(`Error updating user: ${user.error}`);
        else {
          setEditingUser(undefined);
          fetchAllUsers();
        }
      });
    }
  }

  const handleCancelUpdateUser = () => {
    setEditingUser(undefined);
  }

  const handleDeleteUser = () => {
    if (editingUser?._id) {
      deleteUser(editingUser._id).then((user) => {
        console.log('user:',user)
        fetchAllUsers();
        setEditingUser(undefined);
      }).catch((error) => {
        console.error('error:',error)
      });
    }
  }

  // timezone is the shift in seconds from UTC
  const getCurrentTime = (timezone: string | undefined) => {
    if (!timezone) return 'Not available';
    const utc = new Date().getTime() + (parseInt(timezone) * 1000);
    const newDate = new Date(utc);

    return `${newDate.getUTCHours() >= 12 ? newDate.getUTCHours() - 12 : newDate.getUTCHours()}:${newDate.getUTCMinutes()} ${newDate.getUTCHours() >= 12 ? 'PM' : 'AM'}`;
  }

  return (
    <div className="justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="w-full">
          <UsersMap users={users} onMarkerClick={handleSetEditingUser} />
          <div className="flex justify-between items-center">
            <h1>View all users</h1>
            <button className={`bg-cyan-400 hover:bg-cyan-200 rounded-full h-8 w-8 text-stone-800 text-xl transition-all duration-300 ease-in-out ${showCreate && 'rotate-45'}`} onClick={() => handleShowCreateUser()}>+</button>
          </div>

          { showCreate &&
            <div className="p-3 bg-neutral-700 rounded-xl shadow-md">
              <UserForm
                title="Create user"
                isShowing={showCreate}
                name={name}
                zipcode={zipcode}
                setName={setName}
                setZipcode={setZipcode}
                onSubmit={handleCreateUser}
                onCancel={handleClearCreateUser}
                error={createError}
              />
            </div>
          }

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 font-bold p-3">
              <div className="w-1/4 p-1">Name</div>
              <div className="w-1/4 p-1">Zipcode</div>
              <div className="w-1/4 p-1">Location</div>
              <div className="w-1/4 p-1">Local Time</div>
              <div className="w-1/12 p-1"></div>
            </div>
            { users.map((user) => (
              <div key={user._id} className={`show-children flex gap-4 flex-col hover:bg-neutral-700 rounded-xl ${editingUser?._id === user._id && 'bg-neutral-700 shadow-md'}`}>
                <div className="flex gap-4 px-3">
                  <div className="w-1/4 p-1">{user.name}</div>
                  <div className="w-1/4 p-1">{user.zipcode}</div>
                  <div className="w-1/4 p-1">{user.latitude}, {user.longitude}</div>
                  <div className="w-1/4 p-1">{getCurrentTime(user.timezone)}</div>
                  <div className="w-1/12 p-1">
                    { !editingUser && <button onClick={() => handleSetEditingUser(user)} className="text-cyan-400 hover:text-cyan-200 hidden-child">Edit</button> }
                  </div>
                </div>

                { editingUser?._id === user._id &&
                  <div className="px-3 pb-3">
                    <UserForm
                      title="Edit user"
                      isShowing={editingUser?._id === user._id}
                      name={editingUser?.name}
                      zipcode={editingUser?.zipcode}
                      setName={(name: string) => setEditingUser({ ...editingUser, name })}
                      setZipcode={(zip: number) => setEditingUser({ ...editingUser, zipcode: zip })}
                      onSubmit={handleUpdateUser}
                      onCancel={handleCancelUpdateUser}
                      onDelete={handleDeleteUser}
                      error={updateError}
                    />
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
