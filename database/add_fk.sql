-- SET FOREIGN KEYS TO ALL TABLES

ALTER TABLE alarms
  ADD CONSTRAINT fk_alarms FOREIGN KEY(user_dni) REFERENCES users(dni);

ALTER TABLE places
  ADD CONSTRAINT fk_places FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE;

ALTER TABLE unsubscribed_events
  ADD CONSTRAINT fk_unsubscribed_events FOREIGN KEY(event_id) REFERENCES event_id(id) ON DELETE CASCADE;