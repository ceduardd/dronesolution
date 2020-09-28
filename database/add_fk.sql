-- SET FOREIGN KEYS TO ALL TABLES

ALTER TABLE alarms
  ADD CONSTRAINT fk_alarms FOREIGN KEY(user_dni) REFERENCES users(dni);

ALTER TABLE places
  ADD CONSTRAINT fk_places FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE;

ALTER TABLE unsubscribed_events
  ADD CONSTRAINT fk_unsubscribed_events FOREIGN KEY(event_id) REFERENCES event_id(id) ON DELETE CASCADE;

ALTER TABLE agreements
  ADD CONSTRAINT fk_agreements1 FOREIGN KEY(user_dni) REFERENCES users(dni);

ALTER TABLE agreements
  ADD CONSTRAINT fk_agreements2 FOREIGN KEY(plan_id) REFERENCES plans(id);

ALTER TABLE agreements
  ADD CONSTRAINT fk_agreements3 FOREIGN KEY(event_id) REFERENCES events(id);

ALTER TABLE organizations
  ADD CONSTRAINT fk_organizations FOREIGN KEY(user_dni) REFERENCES user(dni);