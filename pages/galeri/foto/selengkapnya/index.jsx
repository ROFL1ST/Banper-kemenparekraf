import React from "react";
import { getGaleri } from "../../../api/restApi";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import Modal from "../modal";
import Loading from "./loading";

export default function Selengkapnya() {
  const [open, setOpen] = React.useState(false);
  const [panjang, setPanjang] = React.useState(0);
  const cancelButtonRef = React.useRef(null);

  const [images, setImages] = React.useState({ data: {}, loading: true });
  async function imageList() {
    try {
      await getGaleri("gallery?offset=0&limit=10").then((result) => {
        setImages((s) => ({ ...s, data: result.data.data, loading: false }));
        setPanjang(result.data.data.length);
      });
    } catch (er) {
      setImages((s) => ({ ...s, loading: false }));
      console.log(er);
    }
  }

  React.useEffect(() => {
    imageList();
  }, []);

  const { data, loading } = images;
  console.log(panjang, "banyak foto");

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />

      <div className="pt-24 px-20">
        {images && !loading ? (
          <div className="grid xl:grid-cols-4 mb-10 gap-4 mt-10">
            {data?.map((i, key) => (
              <Foto
                key={key}
                foto={key}
                i={i}
                loading={loading}
                panjang={panjang}
              />
            ))}
          </div>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
function Foto({ i, foto, loading, panjang }) {
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${i.images[0].images})` }}
        className={`${
          foto === 0 && "col-span-2 row-span-2 h-[650px]"
        } bg-gray-300  w-full min-h-[310px] bg-cover bg-center object-contain ${
          foto === 7 && "col-span-2 row-span-2 h-[650px] justify-end"
        }`}
      >
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="bg-gradient-to-t from-black w-full h-full flex flex-col justify-end p-7"
        >
          <p className="uppercase font-bold text-white xl:text-base lg:text-base md:text-sm text-sm truncate">
            {i.title}
          </p>
        </div>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        foto={i}
      />
    </>
  );
}
