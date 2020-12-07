import { ProposalStatusType } from '../enums/ProposalStatusType';

export class Proposal {
  public constructor(public readonly id: string,
                     public blueprintId: string,
                     public fieldId: string,
                     public status: ProposalStatusType) { }

}
