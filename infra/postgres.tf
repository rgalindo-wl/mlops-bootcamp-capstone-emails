module "postgres_db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "5.1.1"

  identifier = "${var.project}-${var.environment}"

  # All available versions: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts
  engine               = "postgres"
  engine_version       = "14.1"
  family               = "postgres14" # DB parameter group
  major_engine_version = "14"         # DB option group
  instance_class       = "db.t3.micro"
  allocated_storage    = 5

  db_name  = "venus"
  username = "europa"
  password = aws_ssm_parameter.db_password.value
  port     = 5432

  create_db_subnet_group = true
  subnet_ids             = var.subnet_ids
  vpc_security_group_ids = [aws_security_group.postgres.id]
  publicly_accessible    = true

  create_db_option_group    = false
  create_db_parameter_group = false
  create_random_password    = false

  apply_immediately = true

  tags = local.common_tags
}

resource "aws_ssm_parameter" "db_password" {
  name  = "/${var.project}/${var.environment}/postgres/db_password"
  type  = "SecureString"
  value = "to_be_changed"

  lifecycle {
    ignore_changes = [value]
  }

  tags = local.common_tags
}

resource "aws_security_group" "postgres" {
  name        = "${var.project}-${var.environment}-postgres"
  description = "${var.project}-${var.environment}-postgres"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}
