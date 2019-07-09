import chai from 'chai';
import moment from 'moment';
import Roadie from '../src';

chai.should();

describe('Roadie', () => {
  const roadie = new Roadie({
    token: process.env.ROADIE_TOKEN,
  });
  it('should create a shipment', async () => {
    const now = moment()
      .add(1, 'hours')
      .toISOString();
    const then = moment().add(24, 'hours');
    const params = {
      reference_id: 'ABCDEFG12345',
      items: [
        {
          description: 'Item description',
          reference_id: null,
          length: 1.0,
          width: 1.0,
          height: 1.0,
          weight: 1.0,
          value: 20.0,
          quantity: 1,
        },
      ],
      pickup_location: {
        address: {
          name: 'Origin Location',
          store_number: '12324',
          street1: '123 Main Street',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30305',
        },
        contact: {
          name: 'Origin Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      delivery_location: {
        address: {
          name: 'Destination Location',
          store_number: null,
          street1: '456 Central Ave.',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30308',
        },
        contact: {
          name: 'Destination Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      pickup_after: now,
      deliver_between: {
        start: now,
        end: then,
      },
      options: {
        signature_required: true,
        notifications_enabled: false,
        over_21_required: false,
      },
    };

    const shipment = await roadie.createShipment(params);

    shipment.should.be.a('object');
    shipment.should.have.property('id');
    shipment.should.have.property('title');
    shipment.should.have.property('reference_id', params.reference_id);
    shipment.should.have.property('state', 'scheduled');
    shipment.should.have.property('items');
    shipment.should.have.property('pickup_location');
    shipment.should.have.property('delivery_location');
    shipment.should.have.property('pickup_after');
    shipment.should.have.property('deliver_between');
    shipment.should.have.property('options');
    shipment.should.have.property('tracking_number');
    shipment.should.have.property('signatory_name');
    shipment.should.have.property('price');
    shipment.should.have.property('created_at');
    shipment.should.have.property('updated_at');
  });
  it('should delete a shipment', async () => {
    const now = moment()
      .add(1, 'hours')
      .toISOString();
    const then = moment().add(24, 'hours');
    const params = {
      reference_id: 'ABCDEFG12345',
      items: [
        {
          description: 'Item description',
          reference_id: null,
          length: 1.0,
          width: 1.0,
          height: 1.0,
          weight: 1.0,
          value: 20.0,
          quantity: 1,
        },
      ],
      pickup_location: {
        address: {
          name: 'Origin Location',
          store_number: '12324',
          street1: '123 Main Street',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30305',
        },
        contact: {
          name: 'Origin Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      delivery_location: {
        address: {
          name: 'Destination Location',
          store_number: null,
          street1: '456 Central Ave.',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30308',
        },
        contact: {
          name: 'Destination Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      pickup_after: now,
      deliver_between: {
        start: now,
        end: then,
      },
      options: {
        signature_required: true,
        notifications_enabled: false,
        over_21_required: false,
      },
    };

    const shipment = await roadie.createShipment(params);

    await roadie.deleteShipment(shipment.id);
  });
  it('should retrieve a shipment', async () => {
    const now = moment()
      .add(1, 'hours')
      .toISOString();
    const then = moment().add(24, 'hours');
    const params = {
      reference_id: 'ABCDEFG12345',
      items: [
        {
          description: 'Item description',
          reference_id: null,
          length: 1.0,
          width: 1.0,
          height: 1.0,
          weight: 1.0,
          value: 20.0,
          quantity: 1,
        },
      ],
      pickup_location: {
        address: {
          name: 'Origin Location',
          store_number: '12324',
          street1: '123 Main Street',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30305',
        },
        contact: {
          name: 'Origin Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      delivery_location: {
        address: {
          name: 'Destination Location',
          store_number: null,
          street1: '456 Central Ave.',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30308',
        },
        contact: {
          name: 'Destination Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      pickup_after: now,
      deliver_between: {
        start: now,
        end: then,
      },
      options: {
        signature_required: true,
        notifications_enabled: false,
        over_21_required: false,
      },
    };

    const s = await roadie.createShipment(params);

    const shipment = await roadie.retrieveShipment(s.id);

    shipment.should.be.a('object');
    shipment.should.have.property('id');
    shipment.should.have.property('title');
    shipment.should.have.property('reference_id', params.reference_id);
    shipment.should.have.property('state', 'scheduled');
    shipment.should.have.property('items');
    shipment.should.have.property('pickup_location');
    shipment.should.have.property('delivery_location');
    shipment.should.have.property('pickup_after');
    shipment.should.have.property('deliver_between');
    shipment.should.have.property('options');
    shipment.should.have.property('tracking_number');
    shipment.should.have.property('signatory_name');
    shipment.should.have.property('price');
    shipment.should.have.property('created_at');
    shipment.should.have.property('updated_at');
  });

  it('should update a shipment', async () => {
    const now = moment()
      .add(1, 'hours')
      .toISOString();
    const then = moment().add(24, 'hours');
    const params = {
      reference_id: 'ABCDEFG12345',
      items: [
        {
          description: 'Item description',
          reference_id: null,
          length: 1.0,
          width: 1.0,
          height: 1.0,
          weight: 1.0,
          value: 20.0,
          quantity: 1,
        },
      ],
      pickup_location: {
        address: {
          name: 'Origin Location',
          store_number: '12324',
          street1: '123 Main Street',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30305',
        },
        contact: {
          name: 'Origin Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      delivery_location: {
        address: {
          name: 'Destination Location',
          store_number: null,
          street1: '456 Central Ave.',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30308',
        },
        contact: {
          name: 'Destination Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      pickup_after: now,
      deliver_between: {
        start: now,
        end: then,
      },
      options: {
        signature_required: true,
        notifications_enabled: false,
        over_21_required: false,
      },
    };

    const s = await roadie.createShipment(params);

    const params2 = {
      reference_id: 'ABCDEFG12345',
      items: [
        {
          description: 'Item description',
          reference_id: null,
          length: 1.0,
          width: 1.0,
          height: 1.0,
          weight: 1.0,
          value: 20.0,
          quantity: 1,
        },
        {
          description: 'Item 2 description',
          reference_id: null,
          length: 2.0,
          width: 2.0,
          height: 2.0,
          weight: 2.0,
          value: 40.0,
          quantity: 2,
        },
      ],
      pickup_location: {
        address: {
          name: 'Origin Location',
          store_number: '123245',
          street1: '123 Main Street',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30305',
        },
        contact: {
          name: 'Origin Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      delivery_location: {
        address: {
          name: 'Destination Location',
          store_number: null,
          street1: '4567 Central Ave.',
          street2: null,
          city: 'Atlanta',
          state: 'GA',
          zip: '30308',
        },
        contact: {
          name: 'Destination Contact',
          phone: '4049999999',
        },
        notes: null,
      },
      pickup_after: now,
      deliver_between: {
        start: now,
        end: then,
      },
      options: {
        signature_required: true,
        notifications_enabled: false,
        over_21_required: false,
      },
    };

    const shipment = await roadie.updateShipment(s.id, params2);

    shipment.should.be.a('object');
    shipment.should.have.property('id');
    shipment.should.have.property('title');
    shipment.should.have.property('reference_id', params.reference_id);
    shipment.should.have.property('state', 'scheduled');
    shipment.should.have.property('items');
    shipment.should.have.property('pickup_location');
    shipment.should.have.property('delivery_location');
    shipment.should.have.property('pickup_after');
    shipment.should.have.property('deliver_between');
    shipment.should.have.property('options');
    shipment.should.have.property('tracking_number');
    shipment.should.have.property('signatory_name');
    shipment.should.have.property('price');
    shipment.should.have.property('created_at');
    shipment.should.have.property('updated_at');
  });
  it('should create an estimate', async () => {
    const now = moment()
      .add(1, 'hours')
      .toISOString();
    const then = moment().add(24, 'hours');
    const params = {
      items: [
        {
          length: 1.0,
          width: 1.0,
          height: 1.0,
          weight: 1.0,
          quantity: 1,
          value: 20,
        },
      ],
      pickup_location: {
        address: {
          street1: '123 Main Street',
          city: 'Atlanta',
          state: 'GA',
          zip: '30305',
        },
      },
      delivery_location: {
        address: {
          street1: '456 Central Ave.',
          city: 'Atlanta',
          state: 'GA',
          zip: '30308',
        },
      },
      pickup_after: now,
      deliver_between: {
        start: now,
        end: then,
      },
    };

    const estimate = await roadie.estimate(params);

    estimate.should.have.property('price', 12);
    estimate.should.have.property('size', 'medium');
  });
});
