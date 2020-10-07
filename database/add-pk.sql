alter table USERS
  add constraint PK_USERS primary key (DNI);

alter table ALARMS
  add constraint PK_ALARMS primary key (USER_DNI, ISSUED_AT);

alter table ORGANIZATIONS
  add constraint PK_ORGANIZATIONS primary key (USER_DNI);

alter table EVENTS
  add constraint PK_EVENTS primary key (ID);

alter table PLACES
  add constraint PK_PLACES primary key (ID);

alter table UNSUBSCRIBED_EVENTS
  add constraint PK_UNSUBSCRIBED_EVENTS primary key (EVENT_ID);

alter table PLANS
  add constraint PK_PLANS primary key (ID);

alter table AGREEMENTS
  add constraint PK_AGREEMENTS primary key (ID);

alter table PILOTS
  add constraint PK_PILOTS primary key (DNI);

alter table DRONES
  add constraint PK_DRONES primary key (ID);

alter table ADMINISTRATORS
  add constraint PK_ADMINISTRATORS primary key (DNI);