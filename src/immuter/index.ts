import { CloneService } from './clone-service'
import { FreezeService } from './freeze-service'
import { ProduceService } from './produce-service'

type Produce<TBaseState> = (draftState: TBaseState) => void

export class Immuter {
  static produce<TBaseState extends object>(
    aBaseState: TBaseState,
    produce: Produce<TBaseState>,
  ) {
    const draftState = CloneService.execute(aBaseState)
    ProduceService.execute(draftState, produce)
    return FreezeService.execute(draftState)
  }
}