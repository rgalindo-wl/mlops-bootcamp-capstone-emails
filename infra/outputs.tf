output "postgres-endpoint" {
  value = module.postgres_db.db_instance_address
}

output "postgres-db-name" {
  value = module.postgres_db.db_instance_name
}

output "postgres-instance-arn" {
  value = module.postgres_db.db_instance_arn
}
