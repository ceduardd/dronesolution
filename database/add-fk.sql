alter table ALARMS
  add constraint FK_ALARMS foreign key (USER_DNI)
  references USERS (DNI);

alter table ORGANIZATIONS
  add constraint FK_ORGANIZATIONS foreign key (USER_DNI)
  references USERS (DNI);

alter table EVENTS
  add constraint FK_EVENTS foreign key (USER_DNI)
  references USERS (DNI);

alter table PLACES
  add constraint FK_PLACES foreign key (EVENT_ID)
  references EVENTS (ID) on delete cascade;

alter table UNSUBSCRIBED_EVENTS
  add constraint FK_UNSUBSCRIBED_EVENTS foreign key (EVENT_ID)
  references EVENTS (ID) on delete cascade;

alter table AGREEMENTS
  add constraint FK_AGREEMENTS1 foreign key (USER_DNI)
  references USERS (DNI);
alter table AGREEMENTS
  add constraint FK_AGREEMENTS2 foreign key (PLAN_ID)
  references PLANS (ID);
alter table AGREEMENTS
  add constraint FK_AGREEMENTS3 foreign key (EVENT_ID)
  references EVENTS (ID);

alter table DRONES
  add constraint FK_DRONES foreign key (PILOT_DNI)
  references PILOTS (DNI);