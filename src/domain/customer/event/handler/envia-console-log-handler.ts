import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<AddressChangedEvent>{
    handle(event: AddressChangedEvent): void {
        const id = event.eventData.id;
        const nome = event.eventData.name;
        const endereco = `${event.eventData.address.street}, numero: ${event.eventData.address.number}`;
        console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`);   
    }   
}