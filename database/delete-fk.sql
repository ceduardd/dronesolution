alter table ALARMS
  drop constraint FK_ALARMS;

alter table ORGANIZATIONS
  drop constraint FK_ORGANIZATIONS;

alter table EVENTS
  drop constraint FK_EVENTS;

alter table PLACES
  drop constraint FK_PLACES;

alter table UNSUBSCRIBED_EVENTS
  drop constraint FK_UNSUBSCRIBED_EVENTS;

alter table AGREEMENTS
  drop constraint FK_AGREEMENTS1;
alter table AGREEMENTS
  drop constraint FK_AGREEMENTS2;
alter table AGREEMENTS
  drop constraint FK_AGREEMENTS3;

alter table DRONES
  drop constraint FK_DRONES;