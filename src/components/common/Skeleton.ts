export function Skeletons(numberOfSkeletons: number) {
  const skeletonsCard = Array.from(
    { length: numberOfSkeletons },
    () => /*html*/ `
                <div class="card p-3 shadow-lg grid place-content-stretch rounded-xl relative overflow-hidden transition duration-400 ease-in">
                    <div class="skeleton-line w-[50px] h-[50px] rounded-full bg-gray-300 animate-pulse"></div>
                    <div class="skeleton-line mt-2 w-3/4 h-5 bg-gray-300 rounded animate-pulse"></div>
                    <div class="skeleton-line mt-2 w-1/2 h-5 bg-gray-300 rounded animate-pulse"></div>
                    <div class="skeleton-line mt-2 w-2/3 h-5 bg-gray-300 rounded animate-pulse mb-6"></div>
                    <div class="skeleton-line mt-2 w-2/6 h-5 bg-gray-300 rounded animate-pulse absolute right-2 bottom-1"></div>
                </div>
        `
  ).join("");

  return skeletonsCard;
}
