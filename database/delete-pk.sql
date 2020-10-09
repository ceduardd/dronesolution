alter table USERS
  drop constraint PK_USERS;

alter table ALARMS
  drop constraint PK_ALARMS;

alter table ORGANIZATIONS
  drop constraint PK_ORGANIZATIONS;

alter table EVENTS
  drop constraint PK_EVENTS;

alter table PLACES
  drop constraint PK_PLACES;

alter table UNSUBSCRIBED_EVENTS
  drop constraint PK_UNSUBSCRIBED_EVENTS;

alter table PLANS
  drop constraint PK_PLANS;

alter table AGREEMENTS
  drop constraint PK_AGREEMENTS;

alter table PILOTS
  drop constraint PK_PILOTS;

alter table DRONES
  drop constraint PK_DRONES;

alter table ADMINISTRATORS
  drop constraint PK_ADMINISTRATORS;