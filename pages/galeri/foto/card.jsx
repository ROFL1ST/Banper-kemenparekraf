export default function FotoCard({ title, img, setOpen }) {
  return (
    <div
      onClick={() => {
        setOpen(true);
      }}
      className="lg:h-96 2xl:h-[30rem] h-96 rounded-2xl w-full bg-cover bg-center flex flex-col justify-end px-5 py-5"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <h1 className="text-white font-semibold">LOREM IPSUM</h1>
    </div>
  );
}
