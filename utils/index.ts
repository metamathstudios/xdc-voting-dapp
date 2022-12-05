export function ellipseAddress(
    address: string = "",
    width: number = 4
  ): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }