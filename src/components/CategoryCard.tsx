interface categoryProps {
  catName: string;
  imgSrc: string;
}

const CategoryCard = ({ catName, imgSrc }: categoryProps) => {
  return (
    <div>
      <div className=" w-full h-auto flex justify-center items-center object-cover rounded-2xl bg-zinc-100">
        <img src={imgSrc} className="w-[90%] h-[90%]" />
      </div>

      <div className="w-full capitalize p-2 text-xl">{catName}</div>
    </div>
  );
};

export default CategoryCard;
