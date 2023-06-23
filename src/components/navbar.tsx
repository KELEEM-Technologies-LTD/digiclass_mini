import { Dialog, Transition } from "@headlessui/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { Container, Image, Navbar, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import GeneralContext from "../context/gen";
import { StorageBox } from "../core/storage";
import ChangeCurrency from "./elements/change_currency";
import MessageBadge from "./elements/message_badge";
import NotificationBadge from "./elements/notification_badge";
import NotificationDrawer from "./elements/notification_drawer";

export default function NavBar() {
  const { theme, corpid } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    {
      name: `My courses`,
      url: `/my-courses/${corpid}`,
    },
    {
      name: `Messages`,
      url: `/messages/${corpid}`,
    },
    {
      name: `Account`,
      url: `/account/${corpid}?tab=0`,
    },
    // {
    //   name: `Notification`,
    //   url: `/account/${corpid}?tab=1`,
    // },
    {
      name: `Transactions`,
      url: `/account/${corpid}?tab=2`,
    },
  ];

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand
            onClick={() => navigate(`/home/${corpid}`)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={theme?.img}
              alt="company name"
              className="d-inline-block align-top me-2 lg:h-[50px] lg:w-[200px] h-[20px] w-[100px] "
              style={{ width: "150px", height: "40px", objectFit: "cover" }}
              fluid
            />
          </Navbar.Brand>
          <div className="d-flex">
            <span
              style={{
                color: theme?.primary_color,
                fontWeight: "bolder",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              {theme?.name}
            </span>
            <div className="mx-2 flex items-center justify-center">
              {/* <ChangeCurrency /> */}
              <MessageBadge />
              {/* <NotificationBadge /> */}
              <NotificationDrawer />
            </div>
            <Avatar onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
              {StorageBox.retrieveUserData()?.first_name[0]}
              {StorageBox.retrieveUserData()?.last_name[0]}
            </Avatar>
          </div>
        </Container>
      </Navbar>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <div className="fixed inset-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md pl-6 pr-6">
                    <div className="flex font-serif flex-col overflow-y-hidden bg-transparent px-5">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="mt-8">
                          <div className="bg-white rounded-5 font-serif overflow-y-hidden">
                            <div className="py-4 px-4">
                              <ul>
                                {links.map((_d, i) => {
                                  return (
                                    <Fragment key={i}>
                                      <li className="mt-2">
                                        <Link
                                          to={_d?.url}
                                          className={`text-decoration-none text-[${theme?.secondary_color}] hover:text-[${theme?.primary_color}]`}
                                        >
                                          {_d.name}
                                        </Link>
                                      </li>
                                      {i === 1 ? (
                                        <hr className="my-1 mb-3 border-t border-secondary-400" />
                                      ) : null}
                                    </Fragment>
                                  );
                                })}
                              </ul>
                            </div>
                            <hr className="my-1 mx-5 border-t border-secondary-400" />

                            <button
                              className="flex gap-6 px-4 mt-7 mb-5"
                              onClick={() => {
                                StorageBox.clearStorage();
                                window.location.href = `/sign-in/${corpid}`;
                              }}
                            >
                              <LogoutIcon
                                style={{ color: theme?.primary_color }}
                              />
                              <p>Logout</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
