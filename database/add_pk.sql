-- SET PRIMARY KEYS TO ALL TABLES

ALTER TABLE users
  ADD CONSTRAINT pk_users PRIMARY KEY(dni);


ALTER TABLE places
  ADD CONSTRAINT pk_places PRIMARY KEY(id);

ALTER TABLE unsubscribed_events
  ADD CONSTRAINT pk_unsubscribed_events PRIMARY KEY(event_id);

ALTER TABLE plans
  ADD CONSTRAINT pk_plans PRIMARY KEY(id);

ALTER TABLE agreements
  ADD CONSTRAINT pk_agreements PRIMARY KEY(id);