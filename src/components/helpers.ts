export const formatCedis = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
  }).format(number);
};
