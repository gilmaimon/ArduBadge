package config

import (
	"gopkg.in/yaml.v3"
	"log"
	"os"
)

type ServerConfiguration struct {
	Logging struct {
		Enabled bool `yaml:"enabled"`
	} `yaml:"logging"`
	Cache struct {
		Enabled     bool `yaml:"enabled"`
		TimeInHours int  `yaml:"time_in_hours"`
	} `yaml:"cache"`
	TLS struct {
		Enabled bool   `yaml:"enabled"`
		CrtFile string `yaml:"crt_file"`
		KeyFile string `yaml:"key_file"`
	} `yaml:"tls"`
	Libraries struct {
		RefreshRateHours int64 `yaml:"refresh_rate_hours"`
	} `yaml:"libraries"`
}

func ReadServerConfiguration(path string) ServerConfiguration {
	// Read the YAML file
	file, err := os.ReadFile(path)
	if err != nil {
		log.Fatalf("Error reading YAML file: %v", err)
	}

	// Unmarshal the YAML into the struct
	var config ServerConfiguration
	err = yaml.Unmarshal(file, &config)
	if err != nil {
		log.Fatalf("Error unmarshalling YAML: %v", err)
	}

	return config
}
