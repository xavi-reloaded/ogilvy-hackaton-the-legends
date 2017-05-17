export class BasePagedList {
  public hasNext: boolean;
  public hasPrev: boolean;
  public pageIndex: number;
  public pageSize: number;
  public totalPages: number;

  constructor() {
  }
}