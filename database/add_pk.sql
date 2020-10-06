-- SET PRIMARY KEYS TO ALL TABLES

ALTER TABLE users
  ADD CONSTRAINT pk_users PRIMARY KEY(dni);

ALTER TABLE events
  ADD CONSTRAINT pk_events PRIMARY KEY(id);

ALTER TABLE places
  ADD CONSTRAINT pk_places PRIMARY KEY(id);

ALTER TABLE unsubscribed_events
  ADD CONSTRAINT pk_unsubscribed_events PRIMARY KEY(event_id);

ALTER TABLE alarms
  ADD CONSTRAINT pk_alarms PRIMARY KEY(user_dni, issued_at);

ALTER TABLE plans
  ADD CONSTRAINT pk_plans PRIMARY KEY(id);

ALTER TABLE agreements
  ADD CONSTRAINT pk_agreements PRIMARY KEY(id);

ALTER TABLE organizations
  ADD CONSTRAINT pk_organizations PRIMARY KEY(user_dni);

ALTER TABLE pilots
  ADD CONSTRAINT pk_pilots PRIMARY KEY(dni);

ALTER TABLE drones
  ADD CONSTRAINT pk_drones PRIMARY KEY(id);

ALTER TABLE administrators
      ADD CONSTRAINT pk_administrators PRIMARY KEY(dni);